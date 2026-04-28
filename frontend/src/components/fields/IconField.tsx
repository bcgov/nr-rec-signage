import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ChangeEvent,
} from "react";
import type { FieldProps } from "../../interfaces/FieldProps";
import { usePictogramService } from "../../service/pictogramService";
import { useUploadService } from "../../service/uploadService";
import { convertImageFileToSvg } from "../../utils/ImageUtils";
import type PictogramSearchDto from "../../interfaces/PictogramSearchDto";
import type PictogramDto from "../../interfaces/PictogramDto";
import type PictogramCategoryDto from "@/interfaces/PictogramCategoryDto";

interface IconFieldRestrictions {
  categories?: String[];
  can_upload?: boolean;
}

const IconField: React.FC<FieldProps> = ({ field, updateCallback }) => {
  const restrictions: IconFieldRestrictions = field.restriction || {};
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([] as string[]);
  const [pictogramData, setPictogramData] = useState<PictogramSearchDto | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { getPictograms } = usePictogramService();
  const { uploadFile } = useUploadService();

  const fetchPictograms = useCallback(async () => {
    setLoading(true);
    try {
      const categoryIds = category.length> 0 ? category : (restrictions.categories?.map(String) || []);
      const data = await getPictograms(1000, search, categoryIds);
      setPictogramData(data);
    } catch (err) {
      console.error("Failed to fetch pictograms", err);
    } finally {
      setLoading(false);
    }
  }, [getPictograms, search, category]);

  useEffect(() => {
    if (showPopup) {
      fetchPictograms();
    }
  }, [showPopup,search,category]);

  const restrictCategory = (
    categories: PictogramCategoryDto[],
    allowedIds: String[],
  ) => {
    if (allowedIds.length === 0) return categories;
    return categories.filter((cat) =>{
      return allowedIds.includes(cat.id.toString());
    });
  };

  const handleSelect = (pictogram: PictogramDto) => {
    const initialValue = field.value ? field.value.split(";") : [];
    updateCallback([...initialValue, pictogram.link].join(";"));
    setShowPopup(false);
  };

  const handleRemove = (index: number) => {
    const values = field.value ? field.value.split(";") : [];
    const newSelected = values.filter((_: any, i: number) => i !== index);
    updateCallback(newSelected.join(";"));
  };

  const handleUploadClick = () => {
    setUploadError(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadError(null);

    if (file.size > 1024 * 1024) {
      setUploadError("Image must be smaller than 1MB");
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    if (
      !allowedTypes.includes(file.type) &&
      !file.name.match(/\.(png|jpe?g|svg)$/i)
    ) {
      setUploadError("Only PNG, JPEG and SVG files are allowed");
      return;
    }

    setUploading(true);
    try {
      let uploadCandidate: File = file;

      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        /\.(jpe?g)$/i.test(file.name)
      ) {
        const svgString = await convertImageFileToSvg(file);
        const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
        uploadCandidate = new File([svgBlob], "converted.svg", {
          type: "image/svg+xml",
        });
      }

      const url = await uploadFile(uploadCandidate);
      const initialValue = field.value ? field.value.split(";") : [];
      updateCallback([...initialValue, url].join(";"));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const values = field.value ? field.value.split(";") : [];

  return (
    <div className="icon-field">
      <div className="form-input d-flex flex-column">
        <label>{field.name}</label>
        <div className="icon-picker-input d-flex align-items-center gap-2">
          <input
            type="text"
            readOnly
            value={`${values.length} pictogram(s) selected`}
          />
          {restrictions.can_upload && (
            <>
              <button
                type="button"
                className="upload-trigger btn-input btn-primary"
                onClick={handleUploadClick}
                disabled={uploading}
              >
                {uploading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <i className="bi bi-cloud-upload"></i>
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".png,.jpeg,.jpg,.svg,image/png,image/jpeg,image/svg+xml"
                onChange={handleFileChange}
              />
            </>
          )}
          <button
            className="icon-picker-trigger btn-input btn-gray"
            onClick={() => setShowPopup(true)}
            disabled={uploading}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        {uploadError && <div className="text-danger mt-2">{uploadError}</div>}
      </div>

      {values.map((picLink: string, index: number) => (
        <div className="selected-icon" key={`selected-${index}`}>
          <img src={picLink} alt="Selected Icon" style={{ width: "50px" }} />
          <button className="delete-icon" onClick={() => handleRemove(index)}>
            &times;
          </button>
        </div>
      ))}

      {showPopup && (
        <div className="popup">
          <div className="icon-picker-header">
            <p>Select Icon</p>
            <button
              className="btn btn-transparent btn-white-text"
              onClick={() => setShowPopup(false)}
            >
              x
            </button>
          </div>
          <div className="icon-picker-body">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="form-control mb-2 w-50"
              value={category}
              onChange={(e) => setCategory([e.target.value])}
            >
              <option value="">All Categories</option>
              {restrictCategory(
                pictogramData?.categories || [],
                restrictions.categories || [],
              ).map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pictogram-list">
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  {pictogramData?.results.map((pic) => (
                    <img
                      key={pic.id}
                      src={pic.link}
                      alt={pic.name}
                      onClick={() => handleSelect(pic)}
                      style={{ width: "50px", cursor: "pointer" }}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconField;

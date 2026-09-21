import { useState, useEffect } from 'react';
import { usePictogramService } from '../../service/pictogramService';
import PictogramSearchDto from '../../interfaces/PictogramSearchDto';
import Pictogram from '../../components/Pictogram';
import PictogramDto from '../../interfaces/PictogramDto';

export default function PictogramList() {
    const [data, setData] = useState<PictogramSearchDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState([] as string[]);
    const [showModal, setShowModal] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [selectedPictogram, setSelectedPictogram] = useState<PictogramDto | undefined>(undefined);
    const { getPictograms, bulkCreate } = usePictogramService();
    const [bulkLoading, setBulkLoading] = useState(false);
    const fetchPictograms = async () => {
        setLoading(true);
        try {
            const result = await getPictograms(20, search, category,showArchived);
            setData(result);
        } catch (error) {
            console.error('Failed to fetch pictograms', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPictograms();
    }, [search, category, showArchived]);

    const handleNewClick = () => {
        setSelectedPictogram(undefined);
        setShowModal(true);
    };

    const handlePictogramClick = (pictogram: PictogramDto) => {
        setSelectedPictogram(pictogram);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPictogram(undefined);
        fetchPictograms(); // Refresh after creating/updating
    };

    const handleBulkUpload = async (files: FileList | null) => {
        if (!files) return;
        setBulkLoading(true);
        try{
            await bulkCreate(files);
            setGlobalError(null); // Clear any previous error
            fetchPictograms(); // Refresh after bulk upload
        }
        catch(error){
            setGlobalError(error instanceof Error ? error.message : 'An unexpected error occurred during bulk upload.');
        }
        finally{
            setBulkLoading(false);
        }

    }

    return (
        <div className="container mt-4">
            <div className="alert alert-danger" role="alert" style={{ display: globalError ? 'block' : 'none' }}>
                {globalError}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Pictogram Library Management</h1>
                <div className="d-flex gap-2">
                    <button className="btn btn-primary" onClick={handleNewClick}>
                        <i className="bi bi-plus"></i> New
                    </button>
                    <input
                        type="file"
                        multiple
                        accept=".svg"
                        id="bulk-upload"
                        style={{ display: 'none' }}
                        onChange={(e) => handleBulkUpload(e.target.files)}
                    />
                    <button className="btn btn-primary" onClick={() => document.getElementById('bulk-upload')?.click()} disabled={bulkLoading}>
                        {bulkLoading ? "Uploading..." : "Bulk New"}
                    </button>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="search-form form-input d-flex flex-column">
                        <input id="search" type="text" placeholder='Search here...' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <select id="category-filter" className="category-filter-absolute" value={category} onChange={(e) => setCategory([e.target.value])}>
                            <option value="">Categories</option>
                            {data?.categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <label htmlFor="archived-filter" className="archived-filter-label">
                            Show Archived
                            <input type="checkbox" id="archived-filter" className="archived-filter" onChange={(e) => {
                                setShowArchived(e.target.checked);
                            }} />
                        </label>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center" aria-live="polite">
                    <div className="spinner-border" aria-hidden="true"></div>
                    <span className="ms-2">Loading...</span>
                </div>
            ) : (
                <div style={{
                    width: '100%',
                    position: 'relative'
                }}>
                    <div className="grid">
                        {data?.results.map((pictogram) => (
                            <div key={pictogram.id} className="pictogram-card" onClick={() => handlePictogramClick(pictogram)}>
                                <img src={pictogram.link}  className="card-img-top" alt={pictogram.name} />
                                <p className="card-title">{pictogram.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {showModal && data && (
                <Pictogram categories={data.categories} onClose={handleCloseModal} pictogram={selectedPictogram} />
            )}
        </div>
    );
}

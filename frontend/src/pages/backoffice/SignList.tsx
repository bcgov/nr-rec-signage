import React, { useState, useEffect } from 'react';
import { useSignService } from '../../service/signService';
import { useCategoryService } from '../../service/categoryService';
import SignDto from '../../interfaces/SignDto';
import CategoryDto from '../../interfaces/CategoryDto';
import SignRow from '../../components/signs/SignRow';

const PAGE_SIZE = 1;

const RenameModal: React.FC<{ sign: SignDto; onClose: () => void; onRename: (name: string) => void }> = ({ sign, onClose, onRename }) => {
  const [newName, setNewName] = useState(sign.name);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRename = async () => {
    try{
          await onRename(newName || '');
          reset();
    }
    catch(err: any){
      setError(err.message || 'An error occurred');
    }
  };

  const reset = () => {
    setError(null);
    setLoading(false);
    onClose();
  }
  return (
		<div className="action-popup-overlay">
			{! error && (
				<div className="action-popup" role="dialog" aria-modal="true">
					<p>Rename Sign {sign.name}:</p>
					{loading && (
						<div className="d-flex justify-content-center align-items-center my-3">
							<div className="spinner-border text-primary" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					)}

          {!loading && (
            <>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={newName || ''}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="action-popup-buttons">
              <button className="btn btn-primary" type="button" onClick={handleRename} disabled={loading}>
                  Rename
              </button>
              <button className="btn btn-secondary" type="button" onClick={reset} disabled={loading}>
                Cancel
              </button>
            </div>
            </>
          )}
			</div>)}
			{error && (
				<div className="action-popup" role="dialog" aria-modal="true">
					<p><i className="icon-error bi bi-exclamation-circle"></i></p>
					<p>{error}</p>
					<div className="action-popup-buttons">
						<button className="btn btn-secondary" type="button" onClick={reset}>
							Cancel
						</button>
          </div>
				</div>
			)}
		</div>
	);
}
const SignList: React.FC = () => {
  const { getAllAdmin, approve, updateSign, deleteSign } = useSignService();
  const { getCategories } = useCategoryService();
  const [signs, setSigns] = useState<SignDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [categoryId, setCategoryId] = useState<string>('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [renamingSign, setRenamingSign] = useState<SignDto | null>(null);

  const handleOpenRenameModal = (sign: SignDto) => {
    setRenamingSign(sign);
    setOpenRenameModal(true);
  };

  const handleCloseRenameModal = async () => {
    setRenamingSign(null);
    setOpenRenameModal(false);
    await fetchSigns(currentPage);
  };
  const fetchCategories = async () => {
    try {
      const result = await getCategories();
      setCategories(result);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSigns = async (page: number = 1) => {
    setLoading(true);
    setError(false);
    try {
      const categoryIds = categoryId ? [Number(categoryId)] : undefined;
      const results = await getAllAdmin(PAGE_SIZE, page, dateStart || undefined, dateEnd || undefined, categoryIds, name);
      setTotalRows(results.total);
      setSigns(results.signs);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
   fetchSigns(currentPage);
  }, [currentPage]);

  const handleSearch = async () => {
    currentPage === 1 ? fetchSigns(1) : setCurrentPage(1);
  };

  const handleToggleApproval = async (id: number, isApproved: boolean) => {
    try {
      await approve([{ id, is_approved: isApproved }]);
      await fetchSigns(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSign(id);
      await fetchSigns(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRename = async (sign: SignDto, newName: string) => {
      await updateSign(sign.id+'', sign.category.id,
        sign.id_options,
         sign.fields.map((f) => { return { id_field: f.id, value: f.value }; }),
          newName || '', true);
  };

  const totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE));
  const currentSigns = signs;

  let content = null;

  if (loading) {
    content = (
      <div className="d-flex justify-content-center py-5" aria-live="polite">
        <div className="spinner-border text-primary" aria-hidden="true"></div>
        <span className="visually-hidden">Loading</span>
      </div>
    );
  } else if (error) {
    content = <div className="alert alert-danger">Unable to load sign list.</div>;
  } else {
    content = (
      <>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Preview</th>
                <th>Name</th>
                <th>Date Created</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSigns.map(sign => (
                <SignRow
                  key={sign.id}
                  sign={sign}
                  onToggleApproval={handleToggleApproval}
                  onDelete={handleDelete}
                  onRename={handleOpenRenameModal}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-small btn-outline-primary"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="btn btn-small btn-outline-primary"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
          >
            Next
          </button>
        </div>
      {openRenameModal && renamingSign && (
        <RenameModal
          sign={renamingSign}
          onRename={(name: string) => handleRename(renamingSign, name)}
          onClose={handleCloseRenameModal}
        />
      )}
      </>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Sign Library Management</h1>
      </div>

      <div className="d-flex gap-3 flex-wrap mb-5">
        <div className="form-group">
          <label htmlFor="date-start">Date Start</label>
          <input id="date-start" type="date" className="form-control" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="date-end">Date End</label>
          <input id="date-end" type="date" className="form-control" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="category-select">Category</label>
          <select id="category-select" className="form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="d-flex align-items-end">
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {content}
    </div>
  );
};

export default SignList;

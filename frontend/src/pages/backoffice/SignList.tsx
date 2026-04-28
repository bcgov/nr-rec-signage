import React, { useState, useEffect } from 'react';
import { useSignService } from '../../service/signService';
import { useCategoryService } from '../../service/categoryService';
import SignDto from '../../interfaces/SignDto';
import CategoryDto from '../../interfaces/CategoryDto';
import SignRow from '../../components/signs/SignRow';

const PAGE_SIZE = 10;

const SignList: React.FC = () => {
  const { getAllAdmin, approve, deleteSign } = useSignService();
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
      const results = await getAllAdmin(PAGE_SIZE, page, dateStart || undefined, dateEnd || undefined, categoryIds);
      setCurrentPage(page);
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
    fetchSigns();
  }, []);

  const handleSearch = async () => {
    await fetchSigns(1);
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
      </>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>List of Created Signs</h1>
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
        <div className="d-flex align-items-end">
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {content}
    </div>
  );
};

export default SignList;

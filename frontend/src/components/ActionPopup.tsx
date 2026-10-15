import React from 'react';

interface ActionPopupProps {
	text: string;
	continueAction: () => void;
    cancelAction: () => void;
	active: boolean;
	successAction?: () => void;
}

const ActionPopup = ({ text, continueAction,  cancelAction, active, successAction }: ActionPopupProps) => {
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	if (!active) return null;

	const handleContinue = async () => {
		setLoading(true);
		try {
			await continueAction();
			if (successAction) {
				successAction();
			}
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		cancelAction();
		setError(null);
	}

	return (
		<div className="action-popup-overlay">
			{! error && (
				<div className="action-popup" role="dialog" aria-modal="true">
					<p>{text}</p>
					{loading && (
						<div className="d-flex justify-content-center align-items-center my-3">
							<div className="spinner-border text-primary" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					)}
                    {!loading && (<div className="action-popup-buttons">
                        <button className="btn btn-primary" type="button" onClick={handleContinue} disabled={loading}>
                            Continue
                        </button>
						<button className="btn btn-secondary" type="button" onClick={handleCancel} disabled={loading}>
							Cancel
						</button>
                	</div>)}
			</div>)}
			{error && (
				<div className="action-popup" role="dialog" aria-modal="true">
					<p><i className="icon-error bi bi-exclamation-circle"></i></p>
					<p>{error}</p>
					<div className="action-popup-buttons">
						<button className="btn btn-secondary" type="button" onClick={handleCancel}>
							Cancel
						</button>
                	</div>
				</div>
			)}
		</div>
	);
};

export default ActionPopup;

import React from 'react';

const NoRecord = () => {
    return (
        <>
            <div className="card-body">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-12">
                            <div className="form-input-content text-center error-page">
                                <h6 className="error-text fw-bold"><i className="fa fa-times-circle text-danger"></i>No Record Found</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoRecord;
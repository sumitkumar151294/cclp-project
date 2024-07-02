import React from 'react'
const PageError = ({pageError}) => {

    return (
        <>
            <div className="authincation justify-content-center align-items-center">
                <div className="text-center col-md-5">
                    <h1 className="error-text-500">{pageError?.StatusCode}</h1>
                    <h4 className='server_error'><i className="fa fa-times-circle text-danger"></i>{pageError?.ErrorName}</h4>
                    <p className='error_description'>{pageError?.ErrorDesription}</p>
                    <div>
                        <a className="btn btn-primary" href={pageError?.url}>{pageError?.buttonText}</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageError;
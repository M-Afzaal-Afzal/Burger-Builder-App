import React, {useState, useEffect} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary'
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from '../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

       const [error,errorConfirmedHandler] = useHttpErrorHandler(axios);


        return (
            <Auxiliary>
                <Modal modalClosed={errorConfirmedHandler} show={error}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Auxiliary>
        );
    }

}

export default withErrorHandler;
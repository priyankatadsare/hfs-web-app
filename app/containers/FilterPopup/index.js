/**
 *
 * FilterPopup
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import makeSelectFilterPopup from './selectors';
import reducer from './reducer';
import saga from './saga';
import VerticalProgressBar from '../../components/VerticalProgressBar';
import InputField from '../../components/InputField';
import { setFilter } from './actions';
import { useEffect } from 'react';

export function FilterPopup({
  dispatch,
  setShowFilterPopup,
  showFilterPopup,
  filterPopup,
  state,
}) {
  useInjectReducer({ key: 'filterPopup', reducer });
  useInjectSaga({ key: 'filterPopup', saga });

  const { register, handleSubmit, watch, errors, setValue } = useForm({
    mode: 'onChange',
  });
  const values = watch();
  console.log('AddressInputModal form values', values);

  const handleClose = () => setShowFilterPopup(false);

  useEffect(() => {
    if (filterPopup.panNumber) setValue('pan', filterPopup.panNumber);
    if (filterPopup.customerName)
      setValue('customerName', filterPopup.customerName);
  }, [showFilterPopup]);

  const onSubmit = data => {
    console.log(`data`, data);
    dispatch(setFilter(data, state));
    setShowFilterPopup(false);
  };

  return (
    <>
      <Modal
        show={showFilterPopup}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Filters</Modal.Title>
        </Modal.Header>
        <div className="progress-form card-body">
          <div className="progress-form-inn">
            <form
              className="clix-form cutomerVerifyForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <VerticalProgressBar values={values} errors={errors} />
              <Modal.Body>
                <div className={`customer-verify-blk ${'active'}`}>
                  <div className="row">
                    <div className="col col-12 col-md-6">
                      <InputField
                        className="form-control"
                        id="pan"
                        name="pan"
                        register={register({ required: false })}
                        type="text"
                        errors={errors}
                        placeholder="PAN"
                        labelHtml={<label htmlFor="pan">PAN</label>}
                      />
                    </div>
                    <div className="col col-12 col-md-6">
                      <InputField
                        className="form-control"
                        id="customerName"
                        name="customerName"
                        register={register({ required: false })}
                        type="text"
                        errors={errors}
                        placeholder="Customer Name"
                        labelHtml={
                          <label htmlFor="customerName">Customer Name</label>
                        }
                      />
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <button
                  className="btn button btn-lg button-primary arrowBtn"
                  type="submit"
                >
                  Apply
                </button>
              </Modal.Footer>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

FilterPopup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  filterPopup: makeSelectFilterPopup(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FilterPopup);

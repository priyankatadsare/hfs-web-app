/**
 *
 * UserUploadedDocSection
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserUploadedDocSection from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchDocList } from './actions';
import DocumentStatus from '../DocumentUpload/DocumentStatus';

export function UserUploadedDocSection({
  cuid,
  name,
  index,
  type,
  dispatch,
  userUploadedDocSection,
}) {
  useInjectReducer({ key: 'userUploadedDocSection', reducer });
  useInjectSaga({ key: 'userUploadedDocSection', saga });

  useEffect(() => {
    dispatch(fetchDocList({ cuid, type }));
  }, []);

  return (
    <>
      {userUploadedDocSection.docList[cuid] &&
      userUploadedDocSection.docList[cuid].length > 0 ? (
        <>
          <div className="d-flex">
            <h4>{`Documents Status for ${name}`} &nbsp;</h4>
          </div>
          {userUploadedDocSection.docList[cuid].map(item => (
            <>
              <DocumentStatus item={item} name={name} />
              <hr className="mt-4 mb-4" />
            </>
          ))}
        </>
      ) : null}
    </>
  );
}

UserUploadedDocSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cuid: PropTypes.string.isRequired,
  userUploadedDocSection: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userUploadedDocSection: makeSelectUserUploadedDocSection(),
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
)(UserUploadedDocSection);

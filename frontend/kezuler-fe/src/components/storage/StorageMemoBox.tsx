import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PathName from 'src/constants/PathName';
import { StorageType } from 'src/types/Storage';

import 'src/styles/components.scss';

interface Props {
  id: string;
  storageTitle: string;
  storageType: StorageType;
  storageMemoContent: string;
}

function StorageMemoBox({ id, storageTitle, storageMemoContent }: Props) {
  const navigate = useNavigate();
  const { eventId } = useParams();

  return (
    <div
      className="storage-box"
      onClick={() => navigate(`${PathName.storage}/${eventId}/memo/${id}`)}
    >
      <div className="storage-box-title">{storageTitle}</div>
      <div className="storage-box-content">{storageMemoContent}</div>
    </div>
  );
}

export default StorageMemoBox;

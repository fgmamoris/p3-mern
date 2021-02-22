import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import imgNoImage from '../../assets/no-image.png';

export const Avatar = (props) => {
  const { avatar, setAvatar, imgUrl } = props;
  const [img, setImg] = useState();

  const handleUploadPicture = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
      setImg(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handlePictureClick = (e) => {
    document.querySelector('#fileSelector').click();
  };

  useEffect(() => {
    if (imgUrl === '') {
      setImg(imgNoImage);
    } else {
      setImg(imgUrl);
    }
  }, [imgUrl]);
  return (
    <>
      {avatar === null ? (
        <div>
          <Image
            src={img}
            roundedCircle
            style={{
              maxHeight: '13em',
              maxWidth: '13em',
            }}
          />
          <input
            id="fileSelector"
            type="file"
            name="file"
            style={{ display: 'none' }}
            onChange={handleUploadPicture}
          ></input>
          <PlusCircleFill
            style={{
              marginLeft: '-3.5em',
              marginTop: '10em',
              position: 'absolute',
              cursor: 'pointer',
            }}
            name="ref"
            onClick={handlePictureClick}
            size={40}
          />
        </div>
      ) : (
        <div>
          <Image
            src={img}
            roundedCircle
            style={{
              height: '205px',
              width: '205px',
              maxHeight: '13em',
              maxWidth: '13em',
              //maxHeight: '25em',
              //maxWidth: '13em',
            }}
          />
          <input
            id="fileSelector"
            type="file"
            name="file"
            style={{ display: 'none' }}
            onChange={handleUploadPicture}
          ></input>
          <PlusCircleFill
            style={{
              marginLeft: '-3.5em',
              marginTop: '10em',
              position: 'absolute',
              cursor: 'pointer',
            }}
            name="ref"
            onClick={handlePictureClick}
            size={40}
          />
        </div>
      )}
    </>
  );
};

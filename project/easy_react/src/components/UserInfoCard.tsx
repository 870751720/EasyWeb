import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Card, Button } from 'antd';
import { setAccessToken } from '../utils/netUtil';
import _l from "../utils/i18n";
import "./UserInfoCard.css";

const UserInfoCard: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const logOut = () => { setAccessToken(""); window.location.reload(); };

  return (
    <div className="user-info-card-container">
      {userInfo ? (
        <Card title={_l.TID_COMMON_USER_INFO} bordered={false} className="user-info-card">
          <p>{_l.TID_REGISTER_NAME}: {userInfo.name}</p>
          <p>{_l.TID_REGISTER_EMAIL}: {userInfo.email}</p>
        </Card>
      ) : (
        <p className="no-user-info">No user information available.</p>
      )}
      <Button type="primary" onClick={logOut} className="logout-button">
        {_l.TID_COMMON_LOGOUT}
      </Button>
    </div>
  );
};

export default UserInfoCard;
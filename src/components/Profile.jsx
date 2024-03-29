import PropTypes from "prop-types";

const Profile = ({ user, handleOut }) => {
  return (
    <div className="card w-100 d-block justify-content-start">
      <div className="d-flex justify-content-between align-items-center p-1">
        <p className="text-primary">
          <strong>Welcome :</strong> {user.displayName}
        </p>
        <img src={user.photoURL} className="rounded-circle image-size m-1" />
      </div>
      <div className="d-flex justify-content-end m-1">
        <button onClick={handleOut} className="btn btn-danger size-button m-1">
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Profile;

Profile.propTypes = {
  user: PropTypes.object,
  handleOut: PropTypes.func,
};

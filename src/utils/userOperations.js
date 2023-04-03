import { API } from "aws-amplify";
import {
  updateUser,
  deleteUser as deleteUserMutation,
} from "../graphql/mutations";

export const updateUserPicture = async (userID, newPhoto) => {
  try {
    await API.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userID,
          profilePicture: newPhoto,
        },
      },
    });
  } catch (error) {
    console.log("updateUserPicture error", error);
  }
};

export const updateUserStatus = async (userID, newStatus) => {
  try {
    await API.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userID,
          status: newStatus,
        },
      },
    });
  } catch (error) {
    console.log("updateUserStatus error", error);
  }
};

export const updateUserFirstName = async (userID, newFirstName) => {
  try {
    await API.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userID,
          firstName: newFirstName,
        },
      },
    });
  } catch (error) {
    console.log("updateUserFirstName error", error);
  }
};

export const updateUserLastName = async (userID, newLastName) => {
  try {
    await API.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userID,
          lastName: newLastName,
        },
      },
    });
  } catch (error) {
    console.log("updateUserLastName error", error);
  }
};

export const updateUserNotificationToken = async (userID, token) => {
  try {
    await API.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userID,
          notificationToken: token,
        },
      },
    });
    console.log("User push notification token updated");
  } catch (error) {
    console.log("updateUserNotificationToken error", error);
  }
};

export const updateUserLocation = async (userID, location) => {
  const { latitude, longitude } = location;
  try {
    await API.graphql({
      query: updateUser,
      variables: {
        input: {
          id: userID,
          latitude,
          longitude,
        },
      },
    });
    console.log("user location updated");
  } catch (error) {
    console.log("updateUserLocation", error);
  }
};

export const deleteUser = async (userID) => {
  try {
    await API.graphql({
      query: deleteUserMutation,
      variables: {
        input: {
          id: userID,
        },
      },
    });
    console.log("User deleted successfully");
  } catch (error) {
    console.log("deleteUser", error);
  }
};

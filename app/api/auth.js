// pages/api/auth.js

import { isLoggedIn } from "../firebase/Auth/firebaseAuth";

export default (req, res) => {
  if (!isLoggedIn()) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    res.status(200).json({ message: 'Authenticated' });
  }
};

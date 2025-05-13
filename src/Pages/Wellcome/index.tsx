import { useEffect, useState } from 'react';


function Wellcome() {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user') || '""');

    if (userEmail) {
      setUserName(userEmail.split('@')[0]);
    }
  }, []);


  return (
    <div className="wellcome">
      <div className="wellcome__container">
        <h1 className="wellcome__title">¡Wellcome, {userName}!</h1>
        <p className="wellcome__text">We are glad you visited us! 🎉</p>
      </div>
    </div>
  );
}
export default Wellcome;

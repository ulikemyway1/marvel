import errorImg from './error.gif';

 const ErrorrMessage = () => {
    return (
    <div className="error-message">
      <img src={errorImg} alt="error" />
      <p>
        Oops! Something went wrong. Please try again later.
      </p>
    </div>
  );

}

export default ErrorrMessage;
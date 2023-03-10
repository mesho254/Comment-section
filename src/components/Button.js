import classnames from 'classnames';

function Button({ children, className, onClick, ...rest }) {
  const classes = classnames('button', className, rest);
  return <button className={classes} onClick={onClick}>{children}</button>
}

export default Button;
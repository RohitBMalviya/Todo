export default function Container({ children, className }) {
  return <main className={`${className}`}>{children}</main>;
}

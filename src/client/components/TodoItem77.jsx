export default function TodoItem77({ completed, title }) {
  //   console.log("title", title);
  return (
    <>
      <li className={completed ? "strike-through" : undefined}>{title}</li>
    </>
  );
}

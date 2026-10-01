export const Avatar = ({ name, imgSrc }) => {
  return (
    <ul>
      <li>
        <img src={imgSrc} alt={`Avatar do(a) ${name}`} width={32} height={32} />
      </li>
      <li>@{name}</li>
    </ul>
  );
};

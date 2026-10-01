export const Avatar = ({ name, imgSrc }) => {
  return (
    <ul>
      <li>
        <img src={imgSrc} alt={name} width={32} height={32} />
      </li>
      <li>@{name}</li>
    </ul>
  );
};

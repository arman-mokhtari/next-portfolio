interface Props {
  admin: {
    name: string;
    expertise: string;
  };
}
const AdminIntroduce = ({ admin }: Props) => {
  return (
    <>
      {admin && (
        <>
          <p className="text-dark400_light900 text-xl font-medium">
            {admin.name}
          </p>
          <p className="text-dark100_light900 text-sm">
            {admin.expertise}
          </p>
        </>
      )}
    </>
  );
};


export default AdminIntroduce;

export default function Spinner({ size = 20 }: { size?: number }) {
  const px = `${size}px`;

  return (
    <div
      style={{ width: px, height: px }}
      className="animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"
    />
  );
}

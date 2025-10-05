export default function NotFound() {
  return (
    <div className="bg-[#001230] flex items-center justify-center h-screen text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">۴۰۴</h1>
        <p className="text-lg mb-6">صفحه‌ای که دنبال آن هستید پیدا نشد!</p>
        <a
          href="/"
          className="bg-[#3C9BD8] text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          بازگشت به خانه
        </a>
      </div>
    </div>
  );
}

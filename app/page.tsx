import CanvasComp from "@/components/canvas-comp";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="w-full h-full">
        <CanvasComp />
      </div>
    </div>
  );
}

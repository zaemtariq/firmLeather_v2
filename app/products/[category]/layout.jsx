import SubCatSidebar from "@/components/ProductGallery/SubCatSidebar";
export default function CategoryLayout({ children }) {
  return (
    <section className="flex gap-8">
      {/* Sidebar stays mounted */}
      <SubCatSidebar />

      {/* Page content changes */}
      <div className="flex-1">{children}</div>
    </section>
  );
}

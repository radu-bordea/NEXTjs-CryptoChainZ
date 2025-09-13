import { BarLoader } from "react-spinners";

// --- Custom CSS override for the loader ---
// Centers the loader by making it a block element and applying auto margins
const override = {
  display: "block",
  margin: "0 auto",
};

// --- Spinner Component ---
// A simple wrapper around react-spinners' BarLoader.
// Props:
//   - color: loader color (default "blue")
//   - size: loader size (default "150")
const Spinner = ({ color = "blue", size = "150" }) => {
  return (
    <div>
      {/* BarLoader comes from react-spinners */}
      <BarLoader
        color={color} // color of the bar
        size={size} // size prop (passed to the loader)
        cssOverride={override} // apply custom CSS for centering
        aria-label="Loading..." // accessibility label for screen readers
      />
    </div>
  );
};

export default Spinner;

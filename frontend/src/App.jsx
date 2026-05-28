import { useEffect, useState } from "react";
import axios from "axios";

// Base API URL config
const API_BASE = "https://thirsting-quotable-cheek.ngrok-free.dev/api/public/favorites";
const requestHeaders = { "ngrok-skip-browser-warning": "true" };

function App() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(API_BASE, { headers: requestHeaders });
      setFavorites(response.data);
    } catch (error) {
      console.error("Error loading admin favorites framework data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Mock addition for dashboard management testing
  const addFavorite = async () => {
    try {
      await axios.post(API_BASE, {
        productId: "7558573424711",
        productTitle: "Aurelle Shoulder Bag",
        productHandle: "aurelle-shoulder-bag",
        productImage: "https://perspecteev.myshopify.com/cdn/shop/files/Gemini_Generated_Image_u51bplu51bplu51b.png?v=1779574163&width=450",
        productPrice: "$145.00"
      }, { headers: requestHeaders });
      fetchFavorites();
    } catch (error) {
      console.error("Error creating record node:", error);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`, { headers: requestHeaders });
      fetchFavorites();
    } catch (error) {
      console.error("Error dropping row record node:", error);
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Top Banner Header layout row */}
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.mainTitle}>Customer Favorites Dashboard</h1>
          <p style={styles.subtitleText}>Manage saved merchant items, monitor live listings, and analyze product tracking statuses.</p>
        </div>
        <button onClick={addFavorite} style={styles.primaryActionButton}>
          + Create Mock Favorite
        </button>
      </div>

      {/* Grid Assembly Content States */}
      {isLoading ? (
        <div style={styles.centeredStateMessage}>Loading favorites index matrix...</div>
      ) : favorites.length === 0 ? (
        <div style={styles.emptyContainerCard}>
          <p style={styles.emptyCardText}>No customer favorites logged inside database.</p>
        </div>
      ) : (
        <div style={styles.tableCardContainer}>
          <div style={styles.tableHeaderRow}>
            <span style={{ ...styles.thElement, flex: 2 }}>Product Details</span>
            <span style={{ ...styles.thElement, flex: 1 }}>Product ID</span>
            <span style={{ ...styles.thElement, flex: 1 }}>Price Point</span>
            <span style={{ ...styles.thElement, flex: 0.5, textAlign: "right" }}>Actions</span>
          </div>

          {favorites.map((item) => (
            <div key={item.id} style={styles.dataGridRow}>
              {/* Product Info Block Wrapper Component */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 2 }}>
                <div style={styles.thumbnailWrapper}>
                  {item.productImage ? (
                    <img src={item.productImage} alt="" style={styles.responsiveImageNode} />
                  ) : (
                    <div style={styles.fallbackPlaceholderBox}>No Image</div>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={styles.productTitleText}>{item.productTitle}</span>
                  <span style={styles.handleBadgeLabel}>handle: {item.productHandle || "n/a"}</span>
                </div>
              </div>

              {/* ID Data block */}
              <div style={{ ...styles.cellDataText, flex: 1, fontFamily: "monospace", color: "#6d7175" }}>
                {item.productId}
              </div>

              {/* Price Target Node block */}
              <div style={{ ...styles.cellDataText, flex: 1, fontWeight: "500", color: "#202223" }}>
                {item.productPrice || "—"}
              </div>

              {/* Destructive Control Triggers */}
              <div style={{ flex: 0.5, display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => deleteFavorite(item.id)} style={styles.destructiveButton}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- MODERN CLEAN DESIGN SPECIFICATIONS ---------------- */
const styles = {
  dashboardContainer: {
    maxWidth: "1140px",
    margin: "40px auto",
    padding: "0 24px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: "#202223",
    backgroundColor: "#f6f6f7",
    minHeight: "100vh"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    borderBottom: "1px solid #e1e3e5",
    paddingBottom: "20px"
  },
  mainTitle: {
    fontSize: "24px",
    fontWeight: "600",
    margin: 0,
    color: "#1c1d1f"
  },
  subtitleText: {
    margin: "6px 0 0 0",
    color: "#6d7175",
    fontSize: "14px"
  },
  primaryActionButton: {
    backgroundColor: "#008060", // Shopify Emerald green signature
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease"
  },
  tableCardContainer: {
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
    overflow: "hidden"
  },
  tableHeaderRow: {
    display: "flex",
    backgroundColor: "#f9fafb",
    padding: "16px 24px",
    borderBottom: "1px solid #e1e3e5",
    fontWeight: "600",
    fontSize: "13px",
    color: "#6d7175",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  thElement: {
    display: "block"
  },
  dataGridRow: {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #f1f2f4",
    backgroundColor: "#ffffff",
    transition: "background-color 0.15s ease"
  },
  thumbnailWrapper: {
    width: "50px",
    height: "50px",
    borderRadius: "6px",
    border: "1px solid #e1e3e5",
    overflow: "hidden",
    backgroundColor: "#f6f6f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  responsiveImageNode: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  fallbackPlaceholderBox: {
    fontSize: "10px",
    color: "#8c9196",
    textAlign: "center",
    fontWeight: "500"
  },
  productTitleText: {
    fontWeight: "600",
    fontSize: "15px",
    color: "#202223"
  },
  handleBadgeLabel: {
    fontSize: "12px",
    color: "#6d7175",
    backgroundColor: "#f1f2f4",
    padding: "2px 6px",
    borderRadius: "4px",
    display: "inline-block",
    width: "fit-content"
  },
  cellDataText: {
    fontSize: "14px",
    color: "#4a4c4e"
  },
  destructiveButton: {
    backgroundColor: "transparent",
    color: "#bf0711", // Shopify alert red
    border: "1px solid #e1e3e5",
    borderRadius: "4px",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  emptyContainerCard: {
    background: "#ffffff",
    borderRadius: "8px",
    padding: "60px 24px",
    textAlign: "center",
    border: "1px dashed #c9cccf"
  },
  emptyCardText: {
    color: "#6d7175",
    margin: 0,
    fontSize: "15px"
  },
  centeredStateMessage: {
    textAlign: "center",
    padding: "40px",
    color: "#6d7175",
    fontSize: "15px"
  }
};

export default App;
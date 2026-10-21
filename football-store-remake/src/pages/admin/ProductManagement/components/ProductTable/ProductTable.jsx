// import React, { useState } from "react";

// import { product } from "../../../../../data/productDataExample";

// export default function ProductTable() {
//   const [productTab, setProductTab] = useState("Boots");
//   const [editProduct, setEditProduct] = useState({});
//   const [isEditFormOpen, setEditFormOpen] = useState(false);
//   function openEditForm(pid) {
//     const editP = product.find((p) => p.id === pid);
//     setEditProduct(editP);
//     setEditFormOpen(true);
//   }
//   return (
//     <div>
//       <table className="w-100 table table-hover text-center">
//         <colgroup>
//           <col style={{ width: "10%" }} />
//           <col style={{ width: "30%" }} />
//           <col style={{ width: "10%" }} />
//           <col style={{ width: "20%" }} />
//           <col style={{ width: "20%" }} />
//           <col style={{ width: "10%" }} />
//         </colgroup>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Stock</th>
//             <th>Price</th>
//             <th>Image</th>
//             <th>Option</th>
//           </tr>
//         </thead>
//         <tbody>
//           {product.map(
//             (p, index) =>
//               p.type === "Boots" && (
//                 <tr key={index}>
//                   <td>{p.id}</td>
//                   <td>{p.name}</td>
//                   <td>{p.stock}</td>
//                   <td>
//                     {p.price.toLocaleString("vi-VN")}{" "}
//                     &#8363;
//                   </td>
//                   <td>
//                     <img src={p.thumbnail} alt="" />
//                   </td>
//                   <td>
//                     <button
//                       onClick={(e) => openEditForm(p.id)}
//                     >
//                       <i className="bi bi-pencil-square"></i>
//                     </button>
//                   </td>
//                 </tr>
//               )
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

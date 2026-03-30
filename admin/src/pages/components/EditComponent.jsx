// admin/src/pages/components/EditComponent.jsx

import { useState, useEffect }  from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComponentBySlug, updateComponent, getCategories, getTags } from "../../services/adminApi";
import AddComponent             from "./AddComponent";
import toast                    from "react-hot-toast";

// EditComponent reuses AddComponent form logic
// but pre-populates it with existing data
export default function EditComponent() {
  // This is handled inside AddComponent when an id param exists
  return <AddComponent isEdit />;
}
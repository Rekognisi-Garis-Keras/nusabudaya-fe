import {
  ChessKnight,
  Map,
  ScanSearch,
  Shirt,
  PaintBucket,
  Type,
} from "lucide-react";

export const LIST_SIDEBAR = [
  {
    icon: Map,
    path: "/atlas",
    label: "Atlas",
  },
  {
    icon: ChessKnight,
    path: "/arena",
    label: "Arena",
    protected: true,
  },
  {
    icon: ScanSearch,
    path: "/lens",
    label: "Lens",
  },
  {
    icon: Shirt,
    label: "Batik",
    children: [
      {
        icon: PaintBucket,
        path: "/buat-batik",
        label: "Buat Batik",
      },
      {
        icon: PaintBucket,
        path: "/mockup",
        label: "Mockup Batik",
      },
    ],
  },
  {
    icon: Type,
    path: "/aksara",
    label: "Aksara",
  },
];

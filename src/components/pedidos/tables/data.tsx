export const statuses = [
  {
    value: "entregado",
    label: "Entregado",
    icon: IconArchive,
  },
  {
    value: "pendiente",
    label: "Pendiente",
    icon: IconArchive,
  },
  {
    value: "cancelado",
    label: "Cancelado",
    icon: IconArchive,
  },
];

function IconArchive() {
  return (
    <svg
      className="text-muted-foreground mr-2 h-4 w-4 text-gray-800 dark:text-white"
      aria-hidden="true"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
        clip-rule="evenodd"
      />
      <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
    </svg>
  );
}

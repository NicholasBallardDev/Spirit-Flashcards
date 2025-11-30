import { Plus } from 'lucide-react';

interface AddCardButtonProps {
  onClick?: () => void;
}

export function AddCardButton({ onClick }: AddCardButtonProps) {

  return (
    <button
      className=
        "px-6 py-6 min-w-24 w-full border rounded-md cursor-pointer hover:bg-gray-100 transition flex items-center gap-2 justify-center mb-4"
      onClick={onClick}
    >
      <span className="text-lg font-semibold text-gray-700">Add Card</span>
      <Plus className="w-5 h-5 text-gray-600" />
    </button>
  );
}
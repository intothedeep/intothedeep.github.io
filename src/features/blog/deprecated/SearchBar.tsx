import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear }: any) {
    return (
        <div className="search-bar">
            <div className="search-icon">
                <Search size={18} />
            </div>
            <input
                type="text"
                placeholder="Search documentation..."
                value={value}
                onChange={onChange}
                className="search-input"
            />
            {value && (
                <button
                    className="clear-button"
                    onClick={onClear}
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}

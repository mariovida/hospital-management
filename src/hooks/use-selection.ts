import { useCallback, useEffect, useState } from 'react';

export const useSelection = <T extends string | number>(items: T[] = []) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [items]);

  const handleSelectAll = useCallback(() => {
    setSelected(items.map((item) => item.toString()));
  }, [items]);

  const handleDeselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  const handleSelectOne = useCallback((item: T) => {
    setSelected((prevState) => [...prevState, item.toString()]);
  }, []);

  const handleDeselectOne = useCallback((item: T) => {
    setSelected((prevState) => prevState.filter((_item) => _item !== item.toString()));
  }, []);

  const handleSelectMultiple = useCallback((selectedItems: T[]) => {
    setSelected(selectedItems.map((item) => item.toString()));
  }, []);

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    handleSelectMultiple, // <-- Add this
    selected,
  };
};

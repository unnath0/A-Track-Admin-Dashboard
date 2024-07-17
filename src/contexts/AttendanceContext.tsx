import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AttendanceContextProps {
  selectedDept: string | null;
  selectedEmpId: number | null;
  setSelectedDept: (dept: string | null) => void;
  setSelectedEmpId: (empId: number | null) => void;
  selectedTable: string;
  setSelectedTable: (table: string) => void;
}

const AttendanceContext = createContext<AttendanceContextProps | undefined>(undefined);

export const useAttendanceContext = (): AttendanceContextProps => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendanceContext must be used within an AttendanceProvider');
  }
  return context;
};

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedEmpId, setSelectedEmpId] = useState<number | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>('TableTwo');

  return (
    <AttendanceContext.Provider value={{ selectedDept, selectedEmpId, setSelectedDept, setSelectedEmpId, selectedTable, setSelectedTable }}>
      {children}
    </AttendanceContext.Provider>
  );
};

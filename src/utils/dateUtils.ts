export const getFormatedDate = (date:string, showSeparator = true) => {
    const fromDate = new Date(date);
    const year = fromDate.getFullYear();
    const month = String(fromDate.getMonth() + 1).padStart(2, '0');
    const day = String(fromDate.getDate()).padStart(2, '0');
    
    return showSeparator
      ? `${year}-${month}-${day}`
      : `${year}${month}${day}`;
  };
// utils.js
export const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  export const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

 // Function to generate a hash code from a string
 export function hashCode(str) {
    let hash = 1;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 0) - hash + char;
    }
    return hash;
 }
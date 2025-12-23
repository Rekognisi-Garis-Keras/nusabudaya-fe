export const formatDate = (date, locale = 'id-ID', options = {
  weekday: 'long', 
  day: 'numeric', 
  month: 'long', 
  year: 'numeric' 
}) => {
  return new Date(date).toLocaleDateString(locale, options);
}

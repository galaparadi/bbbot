module.exports = (text, maxLength = 200) => text.length > maxLength ? `${text.substring(0,maxLength)} ...` : text
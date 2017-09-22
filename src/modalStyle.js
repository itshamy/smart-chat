const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(47, 52, 61, 1)',
    flex              :'3',
    zIndex            : '4'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth              : '400px',
    maxHeight             : '400px',
    width                 : '60%',
    padding               : '30px'
  }
};

export default customStyles;

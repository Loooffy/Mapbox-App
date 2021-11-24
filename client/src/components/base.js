import styled from 'styled-components'
import { Box, Text } from 'rebass';

export const SideBar = styled(Box)(
  {
    position: 'fixed',
    maxHeight: '100vh',
    'overflow-y': 'scroll',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#555555',
      borderRadius: '5px',
    },
  },
);

export const Card = styled('div')({
  margin: '1em',
  padding: '1em',
  borderRadius: '10px',
  border: '1px solid #f6f6f6',
  boxShadow: '0 2px 4px rgba(0, 0, 0, .125)',
});

export const Input = styled('input')({
  width: '100%',
  padding: '1em',
  borderRadius: '15px',
  border: '1px solid #f6f6f6',
  boxShadow: '0 2px 4px rgba(0, 0, 0, .125)',
});

export const CardInfo = styled(Text) ({});

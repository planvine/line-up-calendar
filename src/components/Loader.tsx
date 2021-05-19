import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit'

const WithLoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  background: #ffffff;
`

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  /* width: 100px; */
  /* height: 100px; */
  transform: translateX(-50%) translateX(-50%);
`

const Loader: React.FC = () => (
  <WithLoadingWrapper>
    <StyledSpinner name='double-bounce' />
  </WithLoadingWrapper>
)
export { Loader }

import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import { ChatContaint, ChatMessages } from '../../components';

const Chat = () => (
  <Container className="h-100">
    <Row className="h-100">
      <Col className="d-none d-lg-block" lg="4">
        <ChatContaint />
      </Col>
      <Col sm="12" lg="8">
        <Route path="/main/chat/messages" component={ChatMessages} />
      </Col>
    </Row>
  </Container>
);

export default Chat;

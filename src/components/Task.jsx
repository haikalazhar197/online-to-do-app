import React from "react";
import { Card, Button } from "react-bootstrap";

const Task = () => {
  return (
    <Card style={{ marginBottom: "10px", width: "400px" }}>
      <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
        Something
        <Button className="ml-auto" variant="outline-secondary" size="sm">
          Remove
        </Button>
      </Card.Header>
    </Card>
  );
};

export default Task;

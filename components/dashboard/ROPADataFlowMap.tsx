'use client'

import { useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Typography } from '@mui/material';
import { ROPAActivity } from './ropaTypes';

interface ROPADataFlowMapProps {
  activity: ROPAActivity;
}

export default function ROPADataFlowMap({ activity }: ROPADataFlowMapProps) {
  const { nodes, edges } = useMemo(() => {
    const flowNodes: Node[] = [];
    const flowEdges: Edge[] = [];

    // Data Source Node
    flowNodes.push({
      id: 'data-source',
      type: 'input',
      position: { x: 100, y: 200 },
      data: { label: 'Data Source\n(Data Subjects)' },
      style: {
        background: '#E3F2FD',
        border: '2px solid #1976D2',
        borderRadius: '8px',
        padding: '10px',
        minWidth: 150,
      },
    });

    // Systems Nodes
    activity.systems.forEach((system, index) => {
      const nodeId = `system-${index}`;
      flowNodes.push({
        id: nodeId,
        position: { x: 350 + index * 200, y: 100 },
        data: { label: system },
        style: {
          background: '#F3E5F5',
          border: '2px solid #7B1FA2',
          borderRadius: '8px',
          padding: '10px',
          minWidth: 150,
        },
      });
      flowEdges.push({
        id: `edge-source-${nodeId}`,
        source: 'data-source',
        target: nodeId,
        animated: true,
        style: { stroke: '#1976D2', strokeWidth: 2 },
      });
    });

    // Vendor Nodes
    activity.vendors.forEach((vendor, index) => {
      const nodeId = `vendor-${index}`;
      const yPos = 300 + index * 100;
      flowNodes.push({
        id: nodeId,
        position: { x: 600, y: yPos },
        data: { label: vendor },
        style: {
          background: '#FFF3E0',
          border: '2px solid #F57C00',
          borderRadius: '8px',
          padding: '10px',
          minWidth: 150,
        },
      });
      // Connect to first system if exists
      if (activity.systems.length > 0) {
        flowEdges.push({
          id: `edge-system-vendor-${index}`,
          source: `system-${0}`,
          target: nodeId,
          animated: true,
          style: { stroke: '#F57C00', strokeWidth: 2 },
        });
      }
    });

    // Transfer Destinations
    activity.transferDestinations.forEach((dest, index) => {
      const nodeId = `transfer-${index}`;
      flowNodes.push({
        id: nodeId,
        type: 'output',
        position: { x: 900, y: 200 + index * 100 },
        data: { label: `Transfer to\n${dest}` },
        style: {
          background: '#E8F5E9',
          border: '2px solid #388E3C',
          borderRadius: '8px',
          padding: '10px',
          minWidth: 150,
        },
      });
      // Connect from vendors or systems
      if (activity.vendors.length > 0) {
        flowEdges.push({
          id: `edge-vendor-transfer-${index}`,
          source: `vendor-${Math.min(index, activity.vendors.length - 1)}`,
          target: nodeId,
          animated: true,
          style: { stroke: '#388E3C', strokeWidth: 2 },
        });
      } else if (activity.systems.length > 0) {
        flowEdges.push({
          id: `edge-system-transfer-${index}`,
          source: `system-${0}`,
          target: nodeId,
          animated: true,
          style: { stroke: '#388E3C', strokeWidth: 2 },
        });
      }
    });

    return { nodes: flowNodes, edges: flowEdges };
  }, [activity]);

  if (nodes.length === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: 450,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px',
          backgroundColor: 'grey.50',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          No data flow information available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 450,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          attributionPosition="bottom-left"
          style={{ width: '100%', height: 450 }}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </ReactFlowProvider>
    </Box>
  );
}


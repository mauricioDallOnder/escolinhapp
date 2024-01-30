import React from "react";
import {
  Card,
  Box,
  Typography,
  Divider,
  Icon as MuiIcon,
  Icon,
} from "@mui/material";

// Você pode manter sua definição de cores, mas elas não são usadas diretamente no Icon
type Color =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

interface ComplexStatisticsCardProps {
  color?: Color;
  title: string;
  count: string | number;
  date?: string;
  gradient: string;
  icon: React.ReactNode;
}

// Uma função auxiliar para transformar a cor customizada em uma cor válida para o Icon
const getIconColor = (
  color: Color
): "inherit" | "action" | "disabled" | "primary" | "secondary" => {
  switch (color) {
    case "primary":
    case "secondary":
      return color;
    case "info":
    case "success":
    case "warning":
    case "error":
      return "action";
    case "light":
    case "dark":
    default:
      return "inherit";
  }
};

export const Admincard: React.FC<ComplexStatisticsCardProps> = ({
  color = "primary",
  title,
  count,
  date: percentage,
  icon,
  gradient,
}) => {
  // Use a função getIconColor para obter uma cor válida
  const iconColor = getIconColor(color);

  return (
    <Card sx={{ overflow: "visible", position: "relative", mb: 4 }}>
      <Box
        sx={{
          position: "absolute",
          top: "-20px",
          left: "20px",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px",
          borderRadius: "0.75rem",
          backgroundImage: gradient, // Aplique o gradiente aqui
          boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
          color: "white",
        }}
      >
        <Icon color="inherit">{icon}</Icon>
      </Box>
      <Box sx={{ pt: 5, pb: 2, px: 2, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4">{count}</Typography>
      </Box>
      <Divider />
      <Box pb={2} px={2}>
        <Typography
          component="p"
          variant="button"
          color="text.secondary"
          display="flex"
        >
          <Typography variant="body2" color="text.secondary">
            Atualizado em {new Date().toLocaleDateString()}
          </Typography>
        </Typography>
      </Box>
    </Card>
  );
};

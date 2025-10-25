import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import bike from "../assets/bike.jpg"

export const Home = () => {
  return (
    <Card
        sx={{
            maxWidth: 600,
            margin: 'auto',
            mt: 5
        }}
    >
        <Typography
            variant='h6'
            sx={(theme) => ({
                padding: `${theme.spacing(3)} ${theme.spacing(2.5)} ${theme.spacing(2)}`,
                color: theme.palette.primary.main
            })}
        >
            Home Page
        </Typography>

        <CardMedia
            component="img"
            image={bike}
            alt="Unicorn Bicycle"
            sx={{ minHeight: 400}}
        />

        <CardContent>
            <Typography variant="body2">
                Welcome to MERN Skeleton home page
            </Typography>
        </CardContent>
    </Card>
  )
}

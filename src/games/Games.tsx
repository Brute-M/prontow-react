import { AdminLayout } from "@/components/AdminLayout";
import { GameCard } from '@/components/GameCard';
import { useNavigate } from "react-router-dom";
import spinImage from '@/images/spin-the-wheel.png'
import opinioImage from '@/images/opinio.png'


function Games() {
  const navigate = useNavigate();

  return (
    <AdminLayout title="Games">
      <div className="flex flex-wrap justify-center gap-12 p-12">
        
        {/* Card 1: Spin The Wheel */}
        <GameCard
          title="Spin The Wheel"
          bgColor="bg-teal-600"
          onClick={() => navigate('/games/spin-the-wheel')}
        >
            <img
                src={spinImage}
                alt="Spin The Wheel Icon"
                className="w-20 h-20 mb-2"
            />
        </GameCard>

        {/* Card 2: Opinio */}
        <GameCard
          title="Opinio"
          bgColor="bg-teal-700"
          onClick={() => navigate('/games/opinio')}
        >
            <img
                src={opinioImage}
                alt="Opinio Icon"
                className="w-20 h-20 mb-2"
            />
        </GameCard>

      </div>
    </AdminLayout>
  );
}

export default Games;
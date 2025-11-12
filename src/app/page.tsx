"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Dumbbell, 
  Apple, 
  Target, 
  TrendingUp,
  Flame,
  Activity,
  Clock,
  CheckCircle2,
  Share2,
  Crown,
  Calculator,
  ChevronRight,
  Play,
  Trophy,
  Zap,
  Heart,
  Gift,
  Link as LinkIcon,
  Check,
  CreditCard,
  Calendar,
  Sparkles,
  X
} from "lucide-react";

interface UserData {
  weight: number;
  height: number;
  age: number;
  gender: "male" | "female";
  activityLevel: string;
  goal: string;
}

export default function FitnessApp() {
  const [userData, setUserData] = useState<UserData>({
    weight: 70,
    height: 170,
    age: 25,
    gender: "male",
    activityLevel: "moderate",
    goal: "maintain"
  });

  const [showCalculator, setShowCalculator] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);
  const [showTrialBanner, setShowTrialBanner] = useState(true);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);

  // Simular contagem regressiva do trial
  useEffect(() => {
    if (!isPremium && trialDaysLeft > 0) {
      const timer = setInterval(() => {
        setTrialDaysLeft(prev => Math.max(0, prev - 1));
      }, 86400000); // 24 horas
      return () => clearInterval(timer);
    }
  }, [isPremium, trialDaysLeft]);

  // Cálculos
  const calculateBMI = () => {
    const heightInMeters = userData.height / 100;
    return (userData.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const calculateIdealWeight = () => {
    const heightInMeters = userData.height / 100;
    if (userData.gender === "male") {
      return (22 * heightInMeters * heightInMeters).toFixed(1);
    } else {
      return (21 * heightInMeters * heightInMeters).toFixed(1);
    }
  };

  const calculateCalories = () => {
    let bmr;
    if (userData.gender === "male") {
      bmr = 88.362 + (13.397 * userData.weight) + (4.799 * userData.height) - (5.677 * userData.age);
    } else {
      bmr = 447.593 + (9.247 * userData.weight) + (3.098 * userData.height) - (4.330 * userData.age);
    }

    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * activityMultipliers[userData.activityLevel];

    const goalAdjustments: { [key: string]: number } = {
      lose: -500,
      maintain: 0,
      gain: 500
    };

    return Math.round(tdee + goalAdjustments[userData.goal]);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Abaixo do peso", color: "text-blue-600" };
    if (bmi < 25) return { text: "Peso normal", color: "text-green-600" };
    if (bmi < 30) return { text: "Sobrepeso", color: "text-yellow-600" };
    return { text: "Obesidade", color: "text-red-600" };
  };

  const workouts = [
    {
      id: 1,
      name: "Treino de Peito e Tríceps",
      duration: "45 min",
      calories: 320,
      difficulty: "Intermediário",
      exercises: [
        "Supino reto - 4x12",
        "Supino inclinado - 3x12",
        "Crucifixo - 3x15",
        "Tríceps testa - 3x12",
        "Tríceps corda - 3x15"
      ]
    },
    {
      id: 2,
      name: "Treino de Costas e Bíceps",
      duration: "50 min",
      calories: 350,
      difficulty: "Intermediário",
      exercises: [
        "Barra fixa - 4x10",
        "Remada curvada - 4x12",
        "Puxada frontal - 3x12",
        "Rosca direta - 3x12",
        "Rosca martelo - 3x12"
      ]
    },
    {
      id: 3,
      name: "Treino de Pernas",
      duration: "60 min",
      calories: 420,
      difficulty: "Avançado",
      exercises: [
        "Agachamento livre - 4x12",
        "Leg press - 4x15",
        "Cadeira extensora - 3x15",
        "Cadeira flexora - 3x15",
        "Panturrilha em pé - 4x20"
      ]
    },
    {
      id: 4,
      name: "Treino de Ombros e Abdômen",
      duration: "40 min",
      calories: 280,
      difficulty: "Iniciante",
      exercises: [
        "Desenvolvimento - 4x12",
        "Elevação lateral - 3x15",
        "Elevação frontal - 3x12",
        "Abdominal supra - 3x20",
        "Prancha - 3x60seg"
      ]
    }
  ];

  const mealPlan = [
    {
      meal: "Café da Manhã",
      time: "07:00",
      foods: ["2 ovos mexidos", "2 fatias de pão integral", "1 banana", "Café com leite"],
      calories: 450,
      protein: 25,
      carbs: 55,
      fats: 12
    },
    {
      meal: "Lanche da Manhã",
      time: "10:00",
      foods: ["1 iogurte grego", "30g de granola", "1 maçã"],
      calories: 280,
      protein: 15,
      carbs: 40,
      fats: 8
    },
    {
      meal: "Almoço",
      time: "12:30",
      foods: ["150g de frango grelhado", "1 xícara de arroz integral", "Salada verde", "Legumes cozidos"],
      calories: 620,
      protein: 45,
      carbs: 70,
      fats: 15
    },
    {
      meal: "Lanche da Tarde",
      time: "16:00",
      foods: ["1 shake de whey protein", "1 banana", "Pasta de amendoim"],
      calories: 350,
      protein: 30,
      carbs: 35,
      fats: 10
    },
    {
      meal: "Jantar",
      time: "19:30",
      foods: ["150g de peixe grelhado", "Batata doce", "Brócolis", "Salada"],
      calories: 480,
      protein: 40,
      carbs: 50,
      fats: 12
    }
  ];

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://meu-corpo-app.vercel.app';
  const referralCode = "FIT2024";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = "Transforme seu corpo! 💪 Treinos e nutrição personalizados";
    const url = `${shareUrl}?ref=${referralCode}`;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${url}&text=${encodeURIComponent(text)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`);
        break;
    }
  };

  const toggleWorkoutComplete = (id: number) => {
    setCompletedWorkouts(prev => 
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const handleSubscribe = (plan: string) => {
    setIsPremium(true);
    setShowPricing(false);
    setShowTrialBanner(false);
  };

  const bmi = parseFloat(calculateBMI());
  const bmiCategory = getBMICategory(bmi);
  const idealWeight = parseFloat(calculateIdealWeight());
  const dailyCalories = calculateCalories();
  const totalMealCalories = mealPlan.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      {/* Trial Banner */}
      {!isPremium && showTrialBanner && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 relative">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5" />
              <p className="text-sm font-medium">
                🎉 <strong>Teste Grátis:</strong> {trialDaysLeft} dias restantes! 
                {trialDaysLeft <= 3 && " ⚠️ Seu período de teste está acabando!"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => setShowPricing(true)}
              >
                <Crown className="h-4 w-4 mr-1" />
                Assinar Agora
              </Button>
              <button 
                onClick={() => setShowTrialBanner(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-2 rounded-xl">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  Meu Corpo
                  {isPremium && <Crown className="h-5 w-5 text-yellow-500" />}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Seu corpo, sua conquista</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Dialog open={showShare} onOpenChange={setShowShare}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white border-green-500">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-green-500" />
                      Compartilhe e Ganhe!
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                        🎁 <strong>Ganhe 1 mês grátis</strong> para cada amigo que assinar!
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Seu amigo também ganha 30% OFF na primeira mensalidade
                      </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-700">
                      <div className="flex items-center gap-2 mb-2">
                        <LinkIcon className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-800 dark:text-blue-200">Link do App:</span>
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={shareUrl}
                          readOnly
                          className="flex-1 px-3 py-2 border border-blue-300 rounded-md text-sm bg-white dark:bg-gray-800 font-mono text-xs"
                        />
                        <Button 
                          onClick={() => copyToClipboard(shareUrl)}
                          className="bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          {copied ? <Check className="h-4 w-4" /> : "Copiar"}
                        </Button>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                        ✅ Compartilhe este link com seus amigos!
                      </p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Seu código de indicação:</label>
                      <div className="flex mt-1">
                        <input 
                          type="text" 
                          value={referralCode}
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md text-sm bg-gray-50"
                        />
                        <Button 
                          onClick={() => copyToClipboard(referralCode)}
                          className="rounded-l-none"
                          size="sm"
                        >
                          Copiar
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Compartilhar diretamente:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          onClick={() => handleShare('whatsapp')}
                          className="bg-green-500 hover:bg-green-600"
                          size="sm"
                        >
                          WhatsApp
                        </Button>
                        <Button 
                          onClick={() => handleShare('telegram')}
                          className="bg-blue-500 hover:bg-blue-600"
                          size="sm"
                        >
                          Telegram
                        </Button>
                        <Button 
                          onClick={() => handleShare('facebook')}
                          className="bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          Facebook
                        </Button>
                        <Button 
                          onClick={() => handleShare('twitter')}
                          className="bg-black hover:bg-gray-800"
                          size="sm"
                        >
                          Twitter
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {!isPremium && (
                <Button 
                  onClick={() => setShowPricing(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Assinar
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Modal */}
      <Dialog open={showPricing} onOpenChange={setShowPricing}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              Escolha Seu Plano
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Trial Info */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg text-center">
              <p className="text-sm font-medium text-purple-900 dark:text-purple-200">
                ✨ <strong>7 dias grátis</strong> para testar todas as funcionalidades premium!
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                Cancele quando quiser, sem compromisso
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Monthly Plan */}
              <Card className="border-2 hover:border-orange-500 transition-all hover:shadow-xl">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full w-fit mb-3">
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl">Plano Mensal</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">R$ 11,99</span>
                    <span className="text-gray-600 dark:text-gray-400">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>7 dias grátis para testar</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Treinos personalizados ilimitados</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Planos alimentares customizados</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Acompanhamento de progresso</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Suporte prioritário</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Cancele quando quiser</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    size="lg"
                    onClick={() => handleSubscribe('monthly')}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Começar Teste Grátis
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    Após 7 dias: R$ 11,99/mês
                  </p>
                </CardContent>
              </Card>

              {/* Annual Plan */}
              <Card className="border-2 border-green-500 relative hover:shadow-2xl transition-all">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    💰 Economize 26%
                  </Badge>
                </div>
                <CardHeader className="text-center pb-4 pt-6">
                  <div className="mx-auto bg-green-100 dark:bg-green-900/20 p-3 rounded-full w-fit mb-3">
                    <Trophy className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Plano Anual</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl text-gray-400 line-through">R$ 287,76</span>
                    </div>
                    <div>
                      <span className="text-4xl font-bold text-green-600">R$ 211,99</span>
                      <span className="text-gray-600 dark:text-gray-400">/ano</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium mt-1">
                      Apenas R$ 17,67/mês
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="font-semibold">7 dias grátis para testar</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="font-semibold">Tudo do plano mensal +</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Economize R$ 75,77 por ano</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Acesso a treinos exclusivos</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Consultoria nutricional mensal</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Prioridade em novos recursos</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    size="lg"
                    onClick={() => handleSubscribe('annual')}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Começar Teste Grátis
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    Após 7 dias: R$ 211,99/ano (cobrança única)
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Guarantee */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                🛡️ <strong>Garantia de 30 dias:</strong> Se não gostar, devolvemos seu dinheiro sem perguntas
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <Card className="mb-6 bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  Bem-vindo ao Meu Corpo! 💪
                  {isPremium && <Crown className="h-6 w-6 text-yellow-300" />}
                </h2>
                <p className="text-orange-100">Transforme seu corpo com treinos e nutrição personalizados</p>
              </div>
              <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Metas
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Calculadora de Metas</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Peso (kg)</Label>
                        <Input 
                          type="number" 
                          value={userData.weight}
                          onChange={(e) => setUserData({...userData, weight: parseFloat(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label>Altura (cm)</Label>
                        <Input 
                          type="number" 
                          value={userData.height}
                          onChange={(e) => setUserData({...userData, height: parseFloat(e.target.value)})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Idade</Label>
                        <Input 
                          type="number" 
                          value={userData.age}
                          onChange={(e) => setUserData({...userData, age: parseInt(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label>Sexo</Label>
                        <select 
                          className="w-full px-3 py-2 border rounded-md"
                          value={userData.gender}
                          onChange={(e) => setUserData({...userData, gender: e.target.value as "male" | "female"})}
                        >
                          <option value="male">Masculino</option>
                          <option value="female">Feminino</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label>Nível de Atividade</Label>
                      <select 
                        className="w-full px-3 py-2 border rounded-md"
                        value={userData.activityLevel}
                        onChange={(e) => setUserData({...userData, activityLevel: e.target.value})}
                      >
                        <option value="sedentary">Sedentário</option>
                        <option value="light">Levemente ativo</option>
                        <option value="moderate">Moderadamente ativo</option>
                        <option value="active">Muito ativo</option>
                        <option value="veryActive">Extremamente ativo</option>
                      </select>
                    </div>
                    <div>
                      <Label>Objetivo</Label>
                      <select 
                        className="w-full px-3 py-2 border rounded-md"
                        value={userData.goal}
                        onChange={(e) => setUserData({...userData, goal: e.target.value})}
                      >
                        <option value="lose">Perder peso</option>
                        <option value="maintain">Manter peso</option>
                        <option value="gain">Ganhar peso</option>
                      </select>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => setShowCalculator(false)}
                    >
                      Salvar e Calcular
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-5 w-5 text-blue-500" />
                <Badge className={bmiCategory.color}>IMC</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{bmi}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{bmiCategory.text}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <Badge variant="outline">Meta</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{idealWeight}kg</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Peso ideal</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <Badge variant="outline">Diário</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{dailyCalories}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calorias/dia</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <Badge variant="outline">Progresso</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedWorkouts.length}/{workouts.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Treinos feitos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="workouts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="workouts" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              <span>Treinos</span>
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="flex items-center gap-2">
              <Apple className="h-4 w-4" />
              <span>Nutrição</span>
            </TabsTrigger>
          </TabsList>

          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Seus Treinos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Plano semanal personalizado</p>
              </div>
              <Badge className="bg-green-500">
                {completedWorkouts.length} concluídos
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workouts.map((workout) => {
                const isCompleted = completedWorkouts.includes(workout.id);
                return (
                  <Card key={workout.id} className={`hover:shadow-lg transition-all ${isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            {workout.name}
                            {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                          </CardTitle>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {workout.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Flame className="h-4 w-4" />
                              {workout.calories} cal
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline">{workout.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Exercícios:</p>
                          <ul className="space-y-1">
                            {workout.exercises.map((exercise, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <ChevronRight className="h-3 w-3" />
                                {exercise}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button 
                          className={`w-full ${isCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}`}
                          onClick={() => toggleWorkoutComplete(workout.id)}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Concluído
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Iniciar Treino
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {isPremium && (
              <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="h-6 w-6 text-yellow-600" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-200">Treinos Premium Desbloqueados!</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Acesso a treinos avançados e personalizados</p>
                    </div>
                  </div>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                    <Zap className="h-4 w-4 mr-2" />
                    Ver Treinos Avançados
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Plano Alimentar</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Baseado em {dailyCalories} calorias/dia</p>
              </div>
              <Badge className="bg-blue-500">
                {totalMealCalories} cal total
              </Badge>
            </div>

            {/* Macros Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo de Macronutrientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {mealPlan.reduce((sum, meal) => sum + meal.protein, 0)}g
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Proteínas</div>
                    <Progress value={75} className="mt-2 h-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {mealPlan.reduce((sum, meal) => sum + meal.carbs, 0)}g
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Carboidratos</div>
                    <Progress value={85} className="mt-2 h-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {mealPlan.reduce((sum, meal) => sum + meal.fats, 0)}g
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Gorduras</div>
                    <Progress value={65} className="mt-2 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meal Plan */}
            <div className="space-y-4">
              {mealPlan.map((meal, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          {meal.meal}
                          <Badge variant="outline" className="text-xs">{meal.time}</Badge>
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {meal.calories} calorias
                        </p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <div>P: {meal.protein}g</div>
                        <div>C: {meal.carbs}g</div>
                        <div>G: {meal.fats}g</div>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {meal.foods.map((food, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          {food}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Hydration Reminder */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Activity className="h-8 w-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-200">Lembre-se de se hidratar!</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Meta diária: 2-3 litros de água
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!isPremium && (
              <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="h-6 w-6 text-yellow-600" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-200">Desbloqueie Planos Personalizados</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Dietas adaptadas ao seu objetivo e preferências</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => setShowPricing(true)}
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Assinar Premium
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Tips Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Dica do Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              💪 <strong>Consistência é a chave!</strong> Não precisa ser perfeito, mas seja consistente. 
              Pequenos progressos diários levam a grandes transformações.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

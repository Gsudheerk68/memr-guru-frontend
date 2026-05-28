import SearchBar from "../components/SearchBar";
import TemplateCard from "../components/TemplateCard";

const templates = [
{
actor:"Mahesh Babu",
movie:"Pokiri",
dialogue:"Evadu Kodithe..."
},
{
actor:"Prabhas",
movie:"Baahubali",
dialogue:"Nenu Vachesa"
}
];

export default function Templates() {

return (
<div className="max-w-7xl mx-auto p-8">

<h1 className="text-4xl font-bold mb-8">
Template Library
</h1>

<SearchBar />

<div className="grid md:grid-cols-3 gap-8 mt-8">

{templates.map((template,index)=>(
<TemplateCard
key={index}
template={{
...template,
image:
"https://picsum.photos/400/300"
}}
/>
))}

</div>

</div>
)
}

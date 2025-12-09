import onnx
from onnx import helper, TensorProto, numpy_helper
import numpy as np
import os

os.makedirs("models", exist_ok=True)

def create_range_model(input_size, min_val, max_val):
    """
    Creates a model returning a random float within the given range.
    """

    # input tensor
    input_tensor = helper.make_tensor_value_info("input", TensorProto.FLOAT, input_size)

    # output tensor (scalar)
    output_tensor = helper.make_tensor_value_info("output", TensorProto.FLOAT, [1])

    # Generate a random constant value inside your range
    value = np.array([np.random.uniform(min_val, max_val)], dtype=np.float32)

    const_tensor = numpy_helper.from_array(value, name="const_tensor")

    const_node = helper.make_node(
        "Constant",
        inputs=[],
        outputs=["output"],
        value=const_tensor
    )

    graph = helper.make_graph(
        [const_node],
        "RangeModel",
        [input_tensor],
        [output_tensor]
    )

    model = helper.make_model(graph, producer_name="range-generator")
    return model


print("Generating dummy ONNX models with controlled score ranges...")

# ---------------------------------------------
# MODELS WITH REALISTIC SCORE RANGES
# ---------------------------------------------
onnx.save(create_range_model([1, 128],    0.8, 1.0), "models/clarity_model.onnx")
onnx.save(create_range_model([1, 3, 64, 64], 0.2, 0.6), "models/engagement_cnn.onnx")
onnx.save(create_range_model([1, 32],     0.4, 0.9), "models/pace_model.onnx")
onnx.save(create_range_model([1, 64],     0.1, 0.4), "models/filler_model.onnx")
onnx.save(create_range_model([1, 256],    0.3, 0.7), "models/tech_depth_model.onnx")

print("All dummy models created successfully!")
